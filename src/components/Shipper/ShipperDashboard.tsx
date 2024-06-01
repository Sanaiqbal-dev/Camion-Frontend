import TrendUpIcon from '../../assets/icons/ic-trend-up.svg';
import TrendDownIcon from '../../assets/icons/ic-trend-down.svg';
import { Image } from 'react-bootstrap';
import { useGetShipperDashboardOrderListQuery } from '@/services/dashboard';
import { useGetProposalQuotationsQuery } from '@/services/ProposalQuotation';
import ShippementDetails from './ShippementDetails';
import { IProposalQuotation } from '@/interface/proposalQuotation';
import { useTranslation } from 'react-i18next';

const ShipperDashboard = () => {
  const { t } = useTranslation(['shipperDashboard']);

  const shipperDashboardData = useGetShipperDashboardOrderListQuery('');
  const proposalQuotation = useGetProposalQuotationsQuery('');
  const ordersCount = shipperDashboardData.currentData?.result;
  const proposalQuotationsData = proposalQuotation.data?.result.result;
  console.log('Data', proposalQuotationsData);

  return (
    <div className="tw-flex tw-flex-col tw-gap-5">
      <div className="row main-stats">
        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.totalOrders}</span>
          <span className="stats-label">{t('totalOrders')}</span>
          <div style={{ display: 'flex' }}>
            {t('orderIncrease')}
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

        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.activeOrders}</span>
          <span className="stats-label">{t('activeOrders')}</span>

          <div style={{ display: 'flex' }}>
            {t('orderIncrease')}
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
        <div className="col stats-item border-right">
          <span className="stats-value">{ordersCount && ordersCount.shipped}</span>
          <span className="stats-label">{t('shipped')}</span>
        </div>

        <div className="col stats-item">
          <span className="stats-value">{ordersCount && ordersCount.orderThisMonth}</span>
          <span className="stats-label">{t('ordersThisMonth')}</span>
          <div style={{ display: 'flex' }}>
            {t('orderDecrease')}
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
          className="border-right"
          style={{
            display: 'flex',
            padding: '10px',
            flexDirection: 'column',
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
            {t('pending')}
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
                {t('assigned')}
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
                {t('unassigned')}
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-right"
          style={{
            display: 'flex',
            padding: '10px',
            flexDirection: 'column',
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
            {t('inProgress')}
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
                {t('dispatched')}
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
                {t('atPickUp')}
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
                {t('inTransit')}
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
            {t('delivered')}
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
          {t('shipmentDetails')}
        </div>
        {proposalQuotationsData &&
          proposalQuotationsData.map((data: IProposalQuotation, index: number) => (
            <ShippementDetails
              orderNumber={index + 1}
              trackingId={data.trackingId}
              amount={data.amount}
              origin={data.origin}
              destination={data.destination}
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
