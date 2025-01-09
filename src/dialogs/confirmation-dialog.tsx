import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import React, { ReactElement } from "react";
import Spinner from "../components/ui/spinner";

export default function ConfirmationDialog(
    props: {
        title: string;
        body: ReactElement;
        onConfirm: () => void;
        confirmButtonText?: string;
        confirmButtonVariant?: "destructive";
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
        fetching?: boolean;
    } & React.PropsWithChildren,
) {
    return (
        <Dialog open={props.fetching || props.open} onOpenChange={!props.fetching ? props.onOpenChange : undefined}>
            {props.children}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={"text-start"}>{props.title}</DialogTitle>
                </DialogHeader>
                {!props.fetching && <>
                    {props.body}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={props.onConfirm}
                                variant={props.confirmButtonVariant}
                            >
                                {props.confirmButtonText ?? "Yes"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </>}
                {props.fetching &&
                    <div className={"w-full flex flex-col items-center justify-center p-6"}><Spinner /></div>}
            </DialogContent>
        </Dialog>
    );
}
