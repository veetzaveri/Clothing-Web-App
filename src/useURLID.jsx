import { useSearchParams } from "react-router-dom";

export function useURLID() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return { id };
}

export function useColor() {
  const [searchParams] = useSearchParams();
  const color = searchParams.get("color");
  return { color };
}
