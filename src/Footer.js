const Footer = ({length}) => {
    // const today = new Date();

    // <p>Copyright &copy; {today.getFullYear()}</p>
    return (
        <footer>
            <p>{length} List {length === 1 ? "Item" : "Items"}</p>
        </footer>
    )
}

export default Footer