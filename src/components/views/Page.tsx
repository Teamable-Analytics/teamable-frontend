import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Text } from "@/components/ui/text"
import { Action } from "@/types"
import { UploadIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import React, { useEffect, useState } from "react"



type PageViewProps = {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: Array<{
    title: string;
    href: string;
  }>;
  actions?: Array<Action>;
};

const PageView = ({ children, title, breadcrumbs, actions }: PageViewProps) => {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return (
    <main className="container flex-col min-h-screen pb-8">
      <div className="flex flex-col gap-3 pt-12 pb-4">
        {breadcrumbs && (
          <div className="flex gap-1">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={index} className="flex flex-row gap-1">
                {index === breadcrumbs.length - 1 ? (
                  <Text
                    element="p"
                    as={"smallText"}
                    className="font-bold"
                  >
                    {breadcrumb.title}
                  </Text>
                ) : (
                  <Link href={breadcrumb.href} className="hover:underline">
                    <Text
                      element="p"
                      as={"smallText"}
                    >
                      {breadcrumb.title}
                    </Text>
                  </Link>
                )}
                {index < breadcrumbs.length - 1 && (
                  <Text element="p" as={"smallText"}>
                    &gt;
                  </Text>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between">
          <Text
            element={"h1"}
            as={"h2"}
            className="text-2xl lg:text-3xl border-0"
          >
            {title}
          </Text>
          {actions && (
            <div className="flex gap-3">
              {isMobile ? (
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        Import data
                        <UploadIcon/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="bottom"
                      align="end"
                      className="absolute right-0 z-50 min-w-[200px]"
                    >
                      <DropdownMenuLabel>Data import options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {actions.map((action, index) => (
                        <DropdownMenuItem
                          key={`action-${index}`}
                          onClick={action.onClick}
                          className="gap-2"
                        >
                          <UploadIcon/>
                          {action.content}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                actions.map((action, index) => (
                  <Button
                    key={`action-${index}`}
                    onClick={action.onClick}
                    loading={action.loading}
                    size="sm"
                  >
                    {action.content}
                  </Button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {children}
    </main>
  )
}

export default PageView
