import {Org} from "../../model/org";
import {useQuery} from "@tanstack/react-query";
import {apiClient} from "../../data/mock-backend";

export function useOrg (): { org?: Org, isFetching: boolean, refetchOrg: () => Promise<unknown> } {
    const { data, isFetching, refetch } = useQuery({
        queryKey: ["org"],
        queryFn: async () => {
            return await apiClient.getOrg()
        },
    })
    return {
        org: data,
        isFetching,
        refetchOrg: refetch,
    }
}