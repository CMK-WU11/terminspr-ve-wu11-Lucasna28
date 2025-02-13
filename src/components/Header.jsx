export default function Header({ title }){
    return(
        <header className="p-6 sticky -top-1 z-30 bg-background">
            <h1 className="text-boxColor text-4xl">{title}</h1>
        </header>
    )
}