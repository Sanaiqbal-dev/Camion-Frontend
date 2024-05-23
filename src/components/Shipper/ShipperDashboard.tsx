import TrendUpIcon from '../../assets/icons/ic-trend-up.svg';
import TrendDownIcon from '../../assets/icons/ic-trend-down.svg';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ShipperDashboard = () => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-5">
      <div className="row main-stats">
        <div className="col stats-item" style={{ borderRight: 'solid 1px #0060B866' }}>
          <span className="stats-value">450</span>
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
          <span className="stats-value">78</span>
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
          <span className="stats-value">372</span>
          <span className="stats-label">Shipped</span>
        </div>

        <div className="col stats-item">
          <span className="stats-value">52</span>
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
            <div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                250
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
            <div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                200
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
            <div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                250
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
            <div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                200
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
            <div>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '36px',
                  fontWeight: '600',
                  lineHeight: '42.19px',
                  textAlign: 'left',
                }}>
                200
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
                250
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '5px' }}>01</h3>
          <div
            className="container"
            style={{
              height: '67px',
              backgroundColor: '#EBF2F9',
              padding: '15px',
              borderRadius: '10px',
            }}>
            <div className="row" style={{ display: 'flex' }}>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Tracking ID:
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  9-859859859
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Ammount
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  SAR.4500
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Origin
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Saudi Arabia
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Destination
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Qatar
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Weight
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  250KG
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Dimension
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  25x20x25
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Status
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Ready to ship
                </div>
              </div>
              <div className="col-sm">
                <Link to={'/shipper/shippertracking'}>
                  <button
                    style={{
                      height: '44px',
                      width: '110px',
                      color: '#fff',
                      backgroundColor: '#0060B8',
                      borderRadius: '10px',
                    }}>
                    Track
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '5px' }}>02</h3>
          <div
            className="container"
            style={{
              height: '67px',
              backgroundColor: '#EBF2F9',
              padding: '15px',
              borderRadius: '10px',
            }}>
            <div className="row" style={{ display: 'flex' }}>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Tracking ID:
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  9-859859859
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Ammount
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  SAR.4500
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Origin
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Saudi Arabia
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Destination
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Qatar
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Weight
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  250KG
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Dimension
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  25x20x25
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Status
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Ready to ship
                </div>
              </div>
              <div className="col-sm">
                <button
                  style={{
                    height: '44px',
                    width: '110px',
                    color: '#fff',
                    backgroundColor: '#0060B8',
                    borderRadius: '10px',
                  }}>
                  Track
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '5px' }}>03</h3>
          <div
            className="container"
            style={{
              height: '67px',
              backgroundColor: '#EBF2F9',
              padding: '15px',
              borderRadius: '10px',
            }}>
            <div className="row" style={{ display: 'flex' }}>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Tracking ID:
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  9-859859859
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Ammount
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  SAR.4500
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Origin
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Saudi Arabia
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Destination
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Qatar
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Weight
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  250KG
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Dimension
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  25x20x25
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Status
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Ready to ship
                </div>
              </div>
              <div className="col-sm">
                <button
                  style={{
                    height: '44px',
                    width: '110px',
                    color: '#fff',
                    backgroundColor: '#0060B8',
                    borderRadius: '10px',
                  }}>
                  Track
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '5px' }}>04</h3>
          <div
            className="container"
            style={{
              height: '67px',
              backgroundColor: '#EBF2F9',
              padding: '15px',
              borderRadius: '10px',
            }}>
            <div className="row" style={{ display: 'flex' }}>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Tracking ID:
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  9-859859859
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Ammount
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  SAR.4500
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Origin
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Saudi Arabia
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Destination
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Qatar
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Weight
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  250KG
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Dimension
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  25x20x25
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Status
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Ready to ship
                </div>
              </div>
              <div className="col-sm">
                <button
                  style={{
                    height: '44px',
                    width: '110px',
                    color: '#fff',
                    backgroundColor: '#0060B8',
                    borderRadius: '10px',
                  }}>
                  Track
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '5px' }}>05</h3>
          <div
            className="container"
            style={{
              height: '67px',
              backgroundColor: '#EBF2F9',
              padding: '15px',
            }}>
            <div className="row" style={{ display: 'flex' }}>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Tracking ID:
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  9-859859859
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Ammount
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  SAR.4500
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Origin
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Saudi Arabia
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Destination
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Qatar
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Weight
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  250KG
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Dimension
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  25x20x25
                </div>
              </div>
              <div className="col-sm">
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                    color: '#7B7878',
                  }}>
                  Status
                </div>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '18.75px',
                    textAlign: 'left',
                  }}>
                  Ready to ship
                </div>
              </div>
              <div className="col-sm">
                <button
                  style={{
                    height: '44px',
                    width: '110px',
                    color: '#fff',
                    backgroundColor: '#0060B8',
                    borderRadius: '10px',
                  }}>
                  Track
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperDashboard;
