import ModelList from "./ModelList"

const Content = ({models, handleCheck, handleDelete}) => {
    return (
        <>
            {models.length ? (
                <ModelList 
                    models = {models}
                    handleCheck = {handleCheck}
                    handleDelete = {handleDelete}
                />
            ): (
                <p style={{marginTop: "2rem"}}>Your List is Empty.</p>
            )}
        </>
    )
}

export default Content