// TODO: Hardcoded for now, will be dynamic in the future

const Breadcrumbs = () => {
    return(
        <div className="container">
            <nav className="bg-grey-light w-full rounded-md">
                <ol className="list-reset flex">
                    <li>
                        <a href="#" className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">Home</a>
                    </li>
                    <li>
                        <span className="mx-2 text-neutral-500 dark:text-neutral-400">&gt;</span>
                    </li>
                    <li>
                        <a href="#" className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">Page</a>
                    </li>
                    <li>
                        <span className="mx-2 text-neutral-500 dark:text-neutral-400">&gt;</span>
                    </li>
                    <li className="text-neutral-500 dark:text-neutral-400">Profiles</li>
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumbs
