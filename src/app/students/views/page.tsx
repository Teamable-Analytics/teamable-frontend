import {Text} from "@/components/ui/text"
import Link from "next/link"

type PageViewProps = {
    children: React.ReactNode;
    title: string;
    rightSide?: React.JSX.Element;
    breadcrumbs?: Array<{
        title: string;
        href: string;
    }>
};

const PageView = ({
    children,
    title,
    rightSide,
    breadcrumbs,
}: PageViewProps) => {
    return (
        <main className="container flex-col min-h-screen">
            <div className="flex flex-col gap-6 pt-10">
                {breadcrumbs && (
                    <div className="flex gap-1">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <>
                                <Link key={index} href={breadcrumb.href}>
                                    <Text element="p" as={"smallText"}>{breadcrumb.title}</Text>
                                </Link>
                                <Text element="p" as={"smallText"}>/</Text>
                            </>
                        ))}
                    </div>
                )}
                <div className="flex justify-between">
                    <Text element={"h1"} as={"h2"} className="border-0">{title}</Text>
                    {rightSide}
                </div>
            </div>
            {children}
        </main>

    )
}

export default PageView
