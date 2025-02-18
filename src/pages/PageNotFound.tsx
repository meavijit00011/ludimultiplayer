
const PageNotFound = () => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        color:'red',
        fontWeight:'700',
        fontSize:'50px'
    }
    return (
        <div style={style}>PageNotFound</div>
    )
}

export default PageNotFound