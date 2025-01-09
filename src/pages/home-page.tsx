import {BookOpen, Building, Users} from "lucide-react";

export function HomePage () {
    return <div className={"flex flex-col items-center"}>
        <div className={"flex flex-col pt-16 max-w-4xl w-full"}>
            <div className={"flex flex-col max-w-2xl gap-4 text-center place-self-center"}>
                <h1>
                    Welcome to Tekkr!<br/>
                    What can we help you master today?
                </h1>
                <p>Tekkr Playbooks is a curation of the most advanced ideas, practices and tools brought together by
                    Tekkr
                    and other tech organizations to make tech teams work better.</p>
            </div>
            <div className={"flex flex-row justify-start gap-2 mt-24"}>
                <BookOpen/>
                <h4>Browse All Playbooks</h4>
            </div>
            <div className={"grid lg:grid-cols-3 sm:grid-cols-2 gap-3 mt-4"}>
                { Array.from({length: 10}, (_, i) => i).map(i => <div
                    key={i}
                    className={"border border-border rounded-lg p-4 flex flex-col gap-2 cursor-not-allowed"}>
                    <div className={"h-36 bg-secondary rounded-md"}></div>
                    <h4 className={"text-lg font-semibold"}>Playbook Title</h4>
                    <p className={"text-sm text-muted-foreground"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className={"flex flex-row items-center gap-4 flex-wrap"}>
                        <div className={"flex flex-row items-center gap-2"}>
                            <Users className={"w-4 h-4"} />
                            <span className={"text-sm shrink-0"}>50 - 500</span>
                        </div>
                        <div className={"flex flex-row items-center gap-2"}>
                            <Building className={"w-4 h-4"} />
                            <span className={"text-sm shrink-0"}>Series A</span>
                        </div>
                    </div>
                </div>) }
            </div>
        </div>
    </div>
}