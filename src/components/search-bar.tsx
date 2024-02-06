import { Input, type InputProps } from "@/components/ui/input"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

interface SearchProps extends InputProps {}

const SearchBar = React.forwardRef<HTMLInputElement, SearchProps>(({className, type, ...props}, ref) => {
    return (
        <div className="flex items-center w-full -ml-4">
            <Icons.magnifyingGlass className="relative left-6"/>
            <Input
                type={type || "search"}
                ref={ref}
                placeholder={props.placeholder || "Search"}
                className={cn("pl-8 w-full", className)}
                {...props}
            />
        </div>
    )
})

SearchBar.displayName = "SearchBar"

export { SearchBar }
