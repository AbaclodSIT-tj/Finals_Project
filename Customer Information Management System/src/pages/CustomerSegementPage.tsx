import {useState} from 'react'

    interface Segment{
        id:number;
        customerType:string;
        info:string;
    }
const CustomerSegmentPage=()=>{
    const [Segment, setSgement]=useState<Segment[]>([
        {
            id:1,
            customerType:"VIP Customer",
            info:"highly valued customer"
        },
        {
            id:2,
            customerType:"Regular Customer",
            info:"Average Consumer"
        },
        {
            id:3,
            customerType:"wholeSale Customer",
            info:"Buy and Sell Customer XD"
        },
        {
            id:4,
            customerType:"Retail Customer",
            info:"personal use Customer"
        },
        {
            id:5,
            customerType:"New Customer",
            info:"First Time? Welcome"
        },
        {
            id:6,
            customerType:"Dormant Customer",
            info:"Inactive(Inconsistent buyer XD) Customer"
        }
    ]);


    return(
        <>
    <div>
      <h2>Customer Segmentation</h2>
      <button onClick={addSegment}>Add New Segment</button>
      <ul>
        {segments.map((segment) => (
          <li key={segment.id}>
            <strong>{segment.name}</strong>: {segment.description}
            <button onClick={() => updateSegment(segment.id, 'Updated Segment Name')}>Update</button>
            <button onClick={() => deleteSegment(segment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
        </>
    );
}
export default CustomerSegmentPage;