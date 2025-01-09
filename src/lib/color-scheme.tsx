import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

function systemsUsesDark () {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useColorScheme() {
    const [isDark, setIsDark] = useLocalStorage<boolean>("dark-mode", systemsUsesDark());

    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined
    );

    const value = useMemo(
        () => (isDark === undefined ? systemPrefersDark : isDark),
        [isDark, systemPrefersDark]
    );

    useEffect(() => {
        if (value) {
            document.body.parentElement!.classList.add("dark");
        } else {
            document.body.parentElement!.classList.remove("dark");
        }
    }, [value]);

    return {
        isDark: value,
        setIsDark,
    };
}
