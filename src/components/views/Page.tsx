import { Text } from "@/components/ui/text"
import Link from "next/link"
import { Action } from "@/types"
import { Button } from "@/components/ui/button"
import React from "react"

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
  return (
    <main className="container flex-col min-h-screen">
      <div className="flex flex-col gap-3 pt-12 pb-8">
        {breadcrumbs && (
          <div className="flex gap-1">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={index} className="flex flex-row gap-1">
                <Link href={breadcrumb.href}>
                  <Text element="p" as={"smallText"}>
                    {breadcrumb.title}
                  </Text>
                </Link>
                <Text element="p" as={"smallText"}>
                  /
                </Text>
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
            <div>
              {actions.map((action, index) => (
                <Button
                  key={`action-${index}`}
                  onClick={action.onClick}
                  disabled={action.loading}
                >
                  {action.content}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      {children}
    </main>
  )
}

export default PageView
