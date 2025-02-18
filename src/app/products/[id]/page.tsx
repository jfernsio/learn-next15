export default function Product({params}: {params: {id: string}}) {
   const {id} = params;
    return (
        <div>
            <h1>Product : {id}</h1>
        </div>
    )
}