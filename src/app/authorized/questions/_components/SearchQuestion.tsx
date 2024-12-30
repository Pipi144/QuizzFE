"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {};

const SearchQuestion = (props: Props) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const onSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <Input
      className="bg-transparent text-white font-concert text-base max-w-[300px]"
      placeholder="Search questions..."
      defaultValue={searchParams.get("search")?.toString()}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchQuestion;
