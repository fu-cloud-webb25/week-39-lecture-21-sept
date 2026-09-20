import './likepanel.css';
import { useAuthStore } from '../../stores/authstore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLikes, getLikedGames, likeGame, unlikeGame } from '../../api/likes';

const LikePanel = ({ gameId }) => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const queryClient = useQueryClient();

    const {
        data: likes,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['likes', gameId],
        queryFn: () => getLikes(gameId),
        enabled: !!gameId
    });

    const {
        data: likedGames = []
    } = useQuery({
        queryKey: ['likedGames', user?.username],
        queryFn: () => getLikedGames(user.username, token),
        enabled: !!user
    });


    const isLiked = likedGames.some(
        (game) => game.gameId === gameId
    );
    
    const likeMutation = useMutation({
        mutationFn: () => likeGame(gameId, token),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['likes', gameId]
            });

            queryClient.invalidateQueries({
                queryKey: ['likedGames', user.username]
            });
        }
    });

    const unlikeMutation = useMutation({
        mutationFn: () => unlikeGame(gameId, token),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['likes', gameId]
            });

            queryClient.invalidateQueries({
                queryKey: ['likedGames', user.username]
            });
        }
    });

    const buttonClass = `
        like-panel__button
        ${user ? 'like-panel__button--interactive' : ''}
        ${user && isLiked ? 'like-panel__button--liked' : ''}
    `;

    const handleLike = () => {
        if (!user) return;

        if (isLiked) {
            unlikeMutation.mutate();
        } else {
            likeMutation.mutate();
        }
    };

    return (
        <div className="like-panel">
            <button 
                className={buttonClass}
                onClick={ handleLike }
            >
                <span className="like-panel__icon">
                    {user && isLiked ? '♥' : '♡'}
                </span>

                {isLoading && (
                    <span className="like-panel__count">
                        ...
                    </span>
                )}

                {isError && (
                    <span className="like-panel__error">
                        {error.message}
                    </span>
                )}

                {!isLoading && !isError && (
                    <strong className="like-panel__count">
                        {likes}
                    </strong>
                )}

                <span className="like-panel__label">
                    Likes
                </span>
            </button>   
        </div>
    );
};

export default LikePanel;