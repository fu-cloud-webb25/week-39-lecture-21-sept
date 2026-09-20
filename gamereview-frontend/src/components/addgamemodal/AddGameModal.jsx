import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addGame } from '../../api/games';
import { useAuthStore } from '../../stores/authstore';

import './addgamemodal.css';

const AddGameModal = ({ onClose }) => {

    const token = useAuthStore((state) => state.token);

    const queryClient = useQueryClient();

    const addGameMutation = useMutation({
        mutationFn: (game) => addGame(game, token),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['games']
            });

            onClose();
        }
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const game = {
            ...data,
            releaseYear: Number(data.releaseYear),
            platforms: data.platforms
                .split(',')
                .map(platform => platform.trim())
                .filter(platform => platform)
        };

        addGameMutation.mutate(game);
    };

    return (
        <div className="add-game-modal__overlay">
            <div className="add-game-modal">
                <header className="add-game-modal__header">
                    <h2 className="add-game-modal__title">
                        Add new game
                    </h2>
                    <button
                        className="add-game-modal__close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </header>
                <form
                    className="add-game-modal__form"
                    onSubmit={handleSubmit}
                >
                    <div className="add-game-modal__group">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Game title"
                            required
                        />
                    </div>

                    <div className="add-game-modal__group">
                        <label htmlFor="developer">
                            Developer
                        </label>
                        <input
                            id="developer"
                            name="developer"
                            type="text"
                            placeholder="Studio name"
                            required
                        />
                    </div>

                    <div className="add-game-modal__group">
                        <label htmlFor="publisher">
                            Publisher
                        </label>
                        <input
                            id="publisher"
                            name="publisher"
                            type="text"
                            placeholder="Publisher name"
                            required
                        />
                    </div>

                    <div className="add-game-modal__group">
                        <label htmlFor="releaseYear">
                            Release year
                        </label>
                        <input
                            id="releaseYear"
                            name="releaseYear"
                            type="number"
                            defaultValue={new Date().getFullYear()}
                            required
                        />
                    </div>

                    <div className="add-game-modal__group">
                        <label htmlFor="category">
                            Category
                        </label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            placeholder="e.g. Action RPG"
                            required
                        />
                    </div>

                    <div className="add-game-modal__group">
                        <label htmlFor="platforms">
                            Platforms (comma-separated)
                        </label>
                        <input
                            id="platforms"
                            name="platforms"
                            type="text"
                            placeholder="PC, PS5, Xbox"
                            required
                        />
                    </div>

                    <div className="add-game-modal__group">
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Brief game description..."
                            required
                        />
                    </div>

                    {addGameMutation.isError && (
                        <p className="add-game-modal__error">
                            {addGameMutation.error.message}
                        </p>
                    )}

                    <div className="add-game-modal__actions">
                        <button
                            type="button"
                            className="add-game-modal__cancel"
                            onClick={onClose}
                            disabled={addGameMutation.isPending}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="add-game-modal__submit"
                            disabled={addGameMutation.isPending}
                        >
                            {addGameMutation.isPending
                                ? 'Adding...'
                                : 'Add game'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGameModal;