import useSWR from "swr";

export default function useSearch({
  q = "",
} = {}) {
  const { data, error } = useSWR("/api/search?q="+q);
  console.log("*****  /api/search?q="+q)
  return {
    result: data,
    isLoading: !error && !data,
    isError: error
  }
}
