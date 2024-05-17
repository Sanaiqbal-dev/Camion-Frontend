import TrendUpIcon from '../../assets/icons/ic-trend-up.svg';
import TrendDownIcon from '../../assets/icons/ic-trend-down.svg';
import { Image } from 'react-bootstrap';
import FleetStatus from '../ui/FleetStatus';
import FleetUsage from '../ui/FleetUsage';
const Dashboard = () => {
  return (
    <div
      className="tw-flex tw-flex-col tw-gap-5"
      style={{
        paddingTop: '15px',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'scroll',
      }}>
      <div className="row main-stats">
        <div className="col stats-item border-right">
          <span className="stats-value">450</span>
          <span className="stats-label">Total Orders</span>
          <div className="tw-flex tw-flex-row tw-gap-2">
            <span>
              Order Increase <span style={{ color: '#0ebc93' }}>5%</span>
            </span>
            <Image src={TrendUpIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">78</span>
          <span className="stats-label">Active Orders</span>
          <div className="tw-flex tw-flex-row tw-gap-2">
            <span>
              Order Increase <span style={{ color: '#0ebc93' }}>5%</span>
            </span>
            <Image src={TrendUpIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">55</span>
          <span className="stats-label">On Route</span>
          <div className="tw-flex tw-flex-row tw-gap-2">
            <span>
              Order Increase <span style={{ color: '#0ebc93' }}>5%</span>
            </span>
            <Image src={TrendUpIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">33</span>
          <span className="stats-label">Orders this month</span>
          <div className="tw-flex tw-flex-row tw-gap-2">
            <span>
              Order Decrease <span style={{ color: 'red' }}>5%</span>
            </span>
            <Image src={TrendDownIcon} />
          </div>
        </div>

        <div className="col stats-item border-right">
          <span className="stats-value">52</span>
          <span className="stats-label">Total Vehicles</span>
        </div>
        <div className="col stats-item">
          <span className="stats-value">52</span>
          <span className="stats-label">Total Drivers</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <FleetStatus />
        </div>
        <div className="col-md-4">
          <FleetUsage />
        </div>
        <div className="col-md-4">
          <FleetUsage />
        </div>
      </div>
      <div className="row additional-stats" style={{ backgroundColor: '#F3F3F3' }}>
        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#FFC5C5' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>Overspeed</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            Max Speed
            <br />0 Km/h
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>Alerts</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#FF7373',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% Object
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#CAD7FF' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>Fence Overstay</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            Max Overstay
            <br />
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>Alerts</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#7F9DFE',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% Object
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#84E7E7' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>AC Misuse</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            Approx Feul waste
            <br />0 ltr
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>Alerts</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#15ACAC',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% Object
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#FFDF8C' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>Stay Away From Zone</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            <br />
            <br />
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>Alerts</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#DFA102',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% Object
          </span>
        </div>

        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#D7EEBC' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>Stay In Zone</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            <br />
            <br />
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>Alerts</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#7DBE32',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% Object
          </span>
        </div>
        <div className="col additional-stats-item border-right" style={{ backgroundColor: '#99E9FF' }}>
          <span style={{ alignSelf: 'flex-start', fontSize: '14px' }}>Temprature</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              color: '#FF3939',
            }}>
            Min Temp. 0.0 C<br />
            Max Temp. 0.0 C
          </span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              fontWeight: '500',
            }}>
            0
          </span>
          <span style={{ alignSelf: 'flex-end', fontSize: '14px' }}>Alerts</span>
          <span
            style={{
              alignSelf: 'flex-end',
              fontSize: '14px',
              backgroundColor: '#0FB6E4',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
            }}>
            0% Object
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
