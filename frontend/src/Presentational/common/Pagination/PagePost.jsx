function PostTestItem({title, date}) {
    return(
        <div>
            <p> 제목 : {title}</p>
            <p> 날자 : {date}</p>
            <hr />
        </div>
    )
}

function PagePost({dumyData}) {

    return(
        <>
        <div className='crypto_list'>
            {dumyData.map((data) => {
                return (
                    <PostTestItem
                        key={data.id}
                        title={data.title}
                        date={data.date}
                    />
                );
            })}
        </div>
        </>
    )
}
export default PagePost;