export default function ItemDescription({ singleItem, setSingleItem }) {
  return (
    <section className="max-w-4xl h-[70%] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 flex">
      <div className="w-1/2 h-full flex flex-col items-center just' p-4">
        <div className="w-full">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" type="button" onClick={() => setSingleItem(null)}>
            Back to Shop
          </button>
        </div>
        <img src={singleItem.image} alt={singleItem.name} className="h-full w-1/2 object-contain" />
      </div>
      <div className="p-4 flex flex-col justify-around flex-wrap w-1/2" >
        <h2 className="text-xl font-semibold text-gray-800">{singleItem.name}</h2>
        <p className="text-gray-600 mt-2">{singleItem.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ${singleItem.price.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
