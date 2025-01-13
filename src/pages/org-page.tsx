import React from "react";
import {Dialog, DialogTrigger} from "../components/ui/dialog";
import {Button} from "../components/ui/button";
import {Mail, UserPlus, X} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "../components/ui/table";
import {useOrg} from "../lib/hooks/use-org";
import {User} from "../model/org";
import Spinner from "../components/ui/spinner";
import {apiClient} from "../data/mock-backend";
import {useMutation} from "@tanstack/react-query";
import ConfirmationDialog from "../dialogs/confirmation-dialog";

function InviteUserButton (props: { user: User }) {
    const { refetchOrg } = useOrg();
    const inviteMutation = useMutation({
        mutationFn: async (userId: string) => {
            await apiClient.inviteUser(userId);
            await refetchOrg();
        },
    });
    return <>
        <ConfirmationDialog
            title={"Send email invite?"}
            body={
                <p>
                    Do you want to send an email invite to {props.user.name}?
                    <br />
                    <span className={"text-sm text-muted-foreground"}>(this doesn't actually send an email)</span>
                </p>
            }
            onConfirm={() => inviteMutation.mutate(props.user.id)}
        >
            <DialogTrigger asChild>
                <Button
                    variant={"outline-primary"}
                    className={inviteMutation.isPending ? "invisible" : undefined}
                    size={"sm"}
                >
                    <Mail className={"w-5 h-5 me-2"} />
                    Invite
                </Button>
            </DialogTrigger>
        </ConfirmationDialog>
        {inviteMutation.isPending && <Spinner />}
    </>
}

function UserRow({ user }: { user: User }) {
    return (
        <TableRow>
            <TableCell>
                <div className={"flex flex-row items-center gap-2"}>
                    {user.name}
                </div>
            </TableCell>
            <TableCell className={"text-muted-foreground"}>{user.title ? user.title : <span className={"opacity-45"}>&mdash;</span>}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className={"flex flex-row items-center gap-2 justify-end h-16"}>
                {!user.hasAccount && <InviteUserButton user={user} /> }
                <Button className={"hidden"} variant={"ghost"} size={"sm"}>
                    <X />
                </Button>
            </TableCell>
        </TableRow>
    );
}

export function OrgPage () {
    const { org } = useOrg();

    if (!org) {
        return <div className={"flex flex-col items-center pt-16 gap-3 opacity-65"}>
            <Spinner />
            Loading Organisation...
        </div>
    }

    return <div className={"flex flex-col items-center"}>
        <div className={"pt-8 max-w-4xl flex flex-col gap-4"}>
            <h1 className={"slide-in-top-variant-1"}>Your Organization: {org.name}</h1>
            <p className={"slide-in-bottom-variant-2"}>
                Need to bring more team members on board? You can easily add new users
                to your organization right from this page. Expand your team's
                capabilities and keep everyone in the loop.
            </p>
            <hr className={"my-4 zoom-in-line"}/>
            <div className={"flex flex-row items-center gap-4 slide-in-bottom-variant-1"}>
                <h3>Members</h3>
                <Button size={"sm"} className={"slide-in-from-left-1"}>
                    <UserPlus className={"w-5 h-5"}/>
                    <span>Add Member</span>
                </Button>
            </div>

            <Table className={"slide-in-bottom-variant-3"}>
                <TableBody>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead className="w-[200px]">Title</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                    {org.users.map((u: User) => (
                        <UserRow key={u.id} user={u}/>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
}