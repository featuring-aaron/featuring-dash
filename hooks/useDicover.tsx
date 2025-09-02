import { useQuery } from "@tanstack/react-query";
import { getDiscover } from "@/lib/api/discover";

export function useDiscover() {
  return useQuery({
    queryKey: ["discover"],
    queryFn: getDiscover,
  });
}
