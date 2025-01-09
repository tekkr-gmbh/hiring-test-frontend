import {Button} from "./ui/button";
import {Link} from "react-router-dom";
import {Building, MoonStar, Sun} from "lucide-react";
import {useColorScheme} from "../lib/color-scheme";

export function Navbar () {
    const { isDark, setIsDark } = useColorScheme();

    function toggleDarkMode() {
        console.log("toggle dark mode");
        setIsDark(!isDark);
    }

    return <div className={"animate-in slide-in-from-top-2 fade-in duration-300"}>
        <div className={"h-16"}></div>
        <div
            className={
                "px-8 h-16 border-b-accent border-b-2 fixed right-0 left-0 top-0 bg-background z-40"
            }
        >
            <div className={"py-3 flex items-center justify-between"}>
                <div className={"flex gap-2 items-center"}>
                    <Link to={"/"}>
                        <div
                            className={
                                "cursor-pointer me-2 w-10 h-10 bg-primary rounded-lg flex flex-col items-center justify-center text-white font-semibold text-xs"
                            }
                        >
                            Tekkr
                        </div>
                    </Link>
                    <Button asChild variant={"ghost"}>
                        <Link to={"/organisation"}><Building className={"w-5 h-5 me-2"}/>Organisation</Link>
                    </Button>
                </div>
                <div className={"flex gap-4 items-center"}>
                    <Button variant={"ghost"} onClick={toggleDarkMode}>
                        { isDark && <Sun /> }
                        { !isDark && <MoonStar /> }
                    </Button>
                </div>
            </div>
        </div>
    </div>
}