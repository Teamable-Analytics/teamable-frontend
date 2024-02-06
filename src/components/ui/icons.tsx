type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    magnifyingGlass: ({...props}: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none" {...props}>
            <path
                d="M13 13.5L10.1333 10.6333M11.6667 6.83333C11.6667 9.77885 9.27885 12.1667 6.33333 12.1667C3.38781 12.1667 1 9.77885 1 6.83333C1 3.88781 3.38781 1.5 6.33333 1.5C9.27885 1.5 11.6667 3.88781 11.6667 6.83333Z"
                stroke="#A1A1AA" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
}
