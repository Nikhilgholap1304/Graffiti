import { Ref } from 'react';
/**
 * Handle the order of the modals.
 * Inspired by the material-ui implementation.
 */
export declare const modalManager: {
    /**
     * Register a new modal
     */
    add: (newModal: Ref<Element>) => void;
    /**
     * Remove a modal
     */
    remove: (oldModal: Ref<Element>) => void;
    /**
     * When multiple modals are rendered will return true if current modal is the last one
     */
    isTopModal: (modal: Ref<Element>) => boolean;
};
export declare function useModalManager(ref: Ref<Element>, open: boolean): void;
