function TrendCell({ value }) {
  if (value == null) return <span className="price-flat">—</span>;
  const cls = value > 0 ? 'price-up' : value < 0 ? 'price-down' : 'price-flat';
  const prefix = value > 0 ? '+' : '';
  return <span className={cls}>{prefix}{value.toFixed(1)}%</span>;
}

export default function MarketTable({ products }) {
  return (
    <div className="table-wrap panel">
      <div className="panel-inner" style={{ paddingTop: 8 }}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Recommendation</th>
              <th>Lowest tracked</th>
              <th>7d</th>
              <th>30d</th>
              <th>Supply delta</th>
              <th>Available / tracked</th>
              <th>Coverage</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <td>{product.name}</td>
                <td>{product.recommendation}</td>
                <td className="mono">€{Number(product.lowestTrackedPrice).toFixed(2)}</td>
                <td><TrendCell value={product.price7d} /></td>
                <td><TrendCell value={product.price30d} /></td>
                <td className={product.supplyDelta30d < 0 ? 'price-up' : 'price-flat'}>
                  {product.supplyDelta30d}%
                </td>
                <td>{product.offers.filter((offer) => offer.available).length}/{product.storesTracked}</td>
                <td>{product.storesTracked} stores · {product.countriesCovered} countries</td>
                <td>{product.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
