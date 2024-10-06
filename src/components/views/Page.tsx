import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Action } from "@/types"
import Link from "next/link"
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
              {actions.map((action, index) => (
                <Button
                  key={`action-${index}`}
                  onClick={action.onClick}
                  loading={action.loading}
                  size="sm"
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
