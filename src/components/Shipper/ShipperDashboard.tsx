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

  const { currentData: shipperDashboardData } = useGetShipperDashboardOrderListQuery('');
  const { data: proposalQuotationData } = useGetProposalQuotationsQuery('');

  const ordersCount = shipperDashboardData?.result;
  const proposalQuotations = proposalQuotationData?.result.result;

  return (
    <div className="tw-flex tw-flex-col tw-gap-5">
      <div className="row main-stats">
        <div className="col stats-item border-right overflow-auto">
          <span className="stats-value">{ordersCount?.totalOrders}</span>
          <span className="stats-label">{t('totalOrders')}</span>
          <div className="stats-progress">
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
        <div className="col stats-item border-right overflow-auto">
          <span className="stats-value">{ordersCount?.activeOrders}</span>
          <span className="stats-label">{t('activeOrders')}</span>
          <div className="stats-progress">
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
          <span className="stats-value">{ordersCount?.shipped}</span>
          <span className="stats-label">{t('shipped')}</span>
        </div>
        <div className="col stats-item">
          <span className="stats-value">{ordersCount?.orderThisMonth}</span>
          <span className="stats-label">{t('ordersThisMonth')}</span>
          <div className="stats-progress">
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

      <div className="responsive-container">
        <div className="section border-right" style={{ flex:'2', minWidth: '300px' }}>
          <div className="title">{t('pending')}</div>
          <div className="items">
            <div className="item">
              <div className="value">{ordersCount?.assigned}</div>
              <div className="label">{t('assigned')}</div>
            </div>
            <div className="item">
              <div className="value">{ordersCount?.notAssigned}</div>
              <div className="label">{t('unassigned')}</div>
            </div>
          </div>
        </div>

        <div className="section border-right" style={{flex:'3', minWidth: '400px' }}>
          <div className="title">{t('inProgress')}</div>
          <div className="items">
            <div className="item">
              <div className="value">{ordersCount?.dispatched}</div>
              <div className="label">{t('dispatched')}</div>
            </div>
            <div className="item">
              <div className="value">{ordersCount?.atPickUp}</div>
              <div className="label" style={{ whiteSpace: 'nowrap' }}>
                {t('atPickUp')}
              </div>
            </div>
            <div className="item">
              <div className="value">{ordersCount?.inTransit}</div>
              <div className="label" style={{ whiteSpace: 'nowrap' }}>
                {t('inTransit')}
              </div>
            </div>
          </div>
        </div>

        <div className="section" style={{flex:'1', minWidth: '150px' }}>
          <div className="title">{t('delivered')}</div>
          <div className="items">
            <div className="item">
              <div className="value">{ordersCount?.delivered}</div>
            </div>
          </div>
        </div>
      </div>

      <div
      className='dashboard-shippment-container'
        >
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
        {proposalQuotations &&
          proposalQuotations.map((data: IProposalQuotation, index: number) => (
            <ShippementDetails
              key={index}
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
