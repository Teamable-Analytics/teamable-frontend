import { Attribute } from "@/_temp_types/homeAttributes"

const AttributesUsed = ({ attributes }: { attributes: Attribute[] }) => {
  const displayedAttributes = attributes.slice(0, 15)
  const hasMoreAttributes = attributes.length > 15

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">Attributes Used</h3>
      <div className="border border-gray-300 p-4 rounded-md">
        <div className={`grid gap-2 ${attributes.length > 0 ? "grid-cols-1 sm:grid-cols-4" : ""}`}>
          {attributes.length > 0 ? (
            <>
              {displayedAttributes.map((attribute, index) => (
                <ul key={index} className="list-disc pl-5">
                  <li>{attribute.name}</li>
                </ul>
              ))}
              {hasMoreAttributes && (
                <ul className="list-disc pl-5">
                  <li>...</li>
                </ul>
              )}
            </>
          ) : (
            <ul className="list-disc pl-5">
              <li>No attributes used</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

AttributesUsed.defaultProps = {
  attributes: [],
}

export default AttributesUsed
