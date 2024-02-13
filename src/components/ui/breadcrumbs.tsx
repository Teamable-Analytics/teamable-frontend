// TODO: Hardcoded for now, will be dynamic in the future with the links

const Breadcrumbs = ({pages}: {pages: string[]}) => {
    return(
        <div className="container">
            <nav className="bg-grey-light w-full rounded-md">
                <ol className="list-reset flex">
                    {pages.map((page, index) => {
                        if (index === pages.length - 1) {
                            return (
                                <li key={index} className="text-neutral-500 dark:text-neutral-400">{page}</li>
                            )
                        }
                        return (
                            <span key={index}>
                                <li>
                                    <a href="#" className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">{page}</a>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">&gt;</span>
                                </li>
                            </span>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumbs
