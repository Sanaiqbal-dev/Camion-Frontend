import TrendUpIcon from '../../assets/icons/ic-trend-up.svg';
import TrendDownIcon from '../../assets/icons/ic-trend-down.svg';
import { Image } from 'react-bootstrap';
import { useGetShipperDashboardOrderListQuery } from '@/services/dashboard';
import { useGetProposalQuotationsQuery } from '@/services/ProposalQuotation';
import ShippementDetails from './ShippementDetails';
import { IProposalQuotation } from '@/interface/proposalQuotation';

const ShipperDashboard = () => {
  const shipperDashboardData = useGetShipperDashboardOrderListQuery('');
  const proposalQuotation = useGetProposalQuotationsQuery('');
  const ordersCount = shipperDashboardData.currentData?.result;
  const proposalQuotationsData = proposalQuotation.data?.result.result;
  console.log('Data', proposalQuotationsData);

  return (
    <div className="tw-flex tw-flex-col tw-gap-5">
      <div className="row main-stats">
        <div className="col stats-item" style={{ borderRight: 'solid 1px #0060B866' }}>
          <span className="stats-value">{ordersCount && ordersCount.totalOrders}</span>
          <span className="stats-label">Total Orders</span>
          <div style={{ display: 'flex' }}>
            Order Increase
            <span
              style={{
                color: '#0ebc93',
                marginLeft: '5px',
                gap: '5px',
                display: 'flex',
              }}>
              5% <Image src={TrendUpIcon} />
            </span>
          </div>
        </div>

        <div className="col stats-item" style={{ borderRight: 'solid 1px #0060B866' }}>
          <span className="stats-value">{ordersCount && ordersCount.activeOrders}</span>
          <span className="stats-label">Active Orders</span>

          <div style={{ display: 'flex' }}>
            Order Increase
            <span
              style={{
                color: '#0ebc93',
                marginLeft: '5px',
                gap: '5px',
                display: 'flex',
              }}>
              5% <Image src={TrendUpIcon} />
            </span>
          </div>
        </div>
        <div className="col stats-item" style={{ borderRight: 'solid 1px #0060B866' }}>
          <span className="stats-value">{ordersCount && ordersCount.shipped}</span>
          <span className="stats-label">Shipped</span>
        </div>

        <div className="col stats-item">
          <span className="stats-value">{ordersCount && ordersCount.orderThisMonth}</span>
          <span className="stats-label">Orders this month</span>
          <div style={{ display: 'flex' }}>
            Order decrease
            <span
              style={{
                color: '#FF3939',
                marginLeft: '5px',
                gap: '5px',
                display: 'flex',
              }}>
              5% <Image src={TrendDownIcon} />
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          background: '#FFF',
          borderRadius: '16px',
          boxShadow: '#DCE0F980',
        }}>
        <div
          style={{
            display: 'flex',
            padding: '10px',
            flexDirection: 'column',
            borderRight: 'solid 1px #0060B866',
            width: '30%',
          }}>
          <div
            style={{
              display: 'flex',
              margin: '10px',
              fontFamily: 'Roboto',
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '23.44px',
              textAlign: 'left',
              color: '#0060B8',
            }}>
            Pending
          </div>
          <div style={{ display: 'flex', gap: '20px', margin: '0 70px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                {ordersCount && ordersCount.assigned}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '23.44px',
                  textAlign: 'left',
                  color: '#0060B8',
                }}>
                Assigned
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                {ordersCount && ordersCount.notAssigned}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '23.44px',
                  textAlign: 'left',
                  color: '#0060B8',
                }}>
                Unassigned
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            padding: '10px',
            flexDirection: 'column',
            borderRight: 'solid 1px #0060B866',
            width: '45%',
          }}>
          <div
            style={{
              display: 'flex',
              margin: '10px',
              fontFamily: 'Roboto',
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '23.44px',
              textAlign: 'left',
              color: '#0060B8',
            }}>
            In progress
          </div>
          <div style={{ display: 'flex', gap: '20px', margin: '0 70px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                {ordersCount && ordersCount.dispatched}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '23.44px',
                  textAlign: 'left',
                  color: '#0060B8',
                }}>
                Dispatched
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                {ordersCount && ordersCount.atPickUp}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '23.44px',
                  textAlign: 'left',
                  color: '#0060B8',
                }}>
                At pick up
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                {ordersCount && ordersCount.inTransit}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '23.44px',
                  textAlign: 'left',
                  color: '#0060B8',
                }}>
                At transit
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            padding: '10px',
            flexDirection: 'column',
          }}>
          <div
            style={{
              display: 'flex',
              margin: '10px',
              fontFamily: 'Roboto',
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '23.44px',
              textAlign: 'left',
              color: '#0060B8',
            }}>
            Delivered
          </div>
          <div style={{ display: 'flex', gap: '20px', margin: '0 70px' }}>
            <div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                {ordersCount && ordersCount.delivered}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: '#FFF',
          borderRadius: '16px',
          boxShadow: '#DCE0F980',
          padding: '10px',
        }}>
        <div
          style={{
            display: 'flex',
            margin: '10px',
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '28px',
            textAlign: 'left',
            color: '#0060B8',
          }}>
          Shipment details
        </div>
        {proposalQuotation &&
          proposalQuotationsData?.map((data: IProposalQuotation, index: number) => (
            <ShippementDetails
              orderNumber={index + 1}
              trackingId={data.trackingId}
              ammount={data.amount}
              origin={data.origin}
              distination={data.destination}
              dimension={data.dimentions}
              weight={data.weight}
              status={data.status}
            />
          ))}
      </div>
    </div>
  );
};

export default ShipperDashboard;
