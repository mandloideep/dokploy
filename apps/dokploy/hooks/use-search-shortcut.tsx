import { useEffect, useRef } from "react";

export const useSearchShortcut = () => {
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
			const isShortcut = isMac
				? event.metaKey && event.key === "k"
				: event.ctrlKey && event.key === "k";

			if (!isShortcut) return;

			const activeElement = document.activeElement;
			const isInputFocused =
				activeElement instanceof HTMLInputElement ||
				activeElement instanceof HTMLTextAreaElement ||
				activeElement instanceof HTMLSelectElement ||
				activeElement?.getAttribute("contenteditable") === "true";

			if (isInputFocused) return;

			event.preventDefault();

			searchInputRef.current?.focus();
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return searchInputRef;
};
