import React from 'react';

const Experience = ({ candidate }) => {
  // Function to calculate the duration between two dates
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffInTime = end.getTime() - start.getTime();
    const diffInMonths = diffInTime / (1000 * 3600 * 24 * 30);
    const years = Math.floor(diffInMonths / 12);
    const months = Math.round(diffInMonths % 12);
    return `${years} yrs - ${months} mos`;
  };

  return (
    <div className="col-md-12 bg-white" style={{ padding: '5%' }}>
      <p className="font-weight-bold text-blue" style={{ fontSize: '18px' }}>
        Experience <span className="text-secondary icon">{candidate.experiencePeriod}</span>
      </p>
      <hr />
      <div className="row">
        <table>
          <tbody>
            {candidate.employers.map((posEmployer) => (
              <tr key={posEmployer.id}>
                <td style={{ verticalAlign: 'top', textAlign: 'left', maxWidth: '96px' }}>
                  <img
                    src="images/company.png"
                    alt="avatar"
                    style={{
                      border: 'none',
                      maxHeight: '55px',
                      marginLeft: '30%',
                      maxWidth: '55px',
                      borderColor: 'white',
                      marginTop: '-10%',
                      paddingRight: '20%',
                    }}
                  />
                </td>
                <td style={{ paddingLeft: '3%', maxWidth: '945px', width: '945px' }}>
                  <strong>{posEmployer.employer.employer_name}</strong>
                  <div>
                    {posEmployer.employer.sub_location}, {posEmployer.employer.region.region_name} -{' '}
                    {posEmployer.employer.region.country.name}
                  </div>
                  <ul className="experiences">
                    {posEmployer.positions.map((position) => (
                      <li key={position.id} className="green dotPosition">
                        <div className="row">
                          <div className="col-md-9 phone_font" align="left" style={{ color: '#2E58A6' }}>
                            {position.position_name}
                          </div>
                          <div className="col-md-3 icon" align="right"></div>
                          <div className="col-md-12">
                            {position.industry && position.industry.industry_name} Industry
                          </div>
                          <div className="col-md-12">
                            {new Date(position.start_date).toLocaleDateString('en-GB')} -{' '}
                            {(position.end_date ? new Date(position.end_date).toLocaleDateString('en-GB') : 'Present')}{' '}
                            . {position.duration}
                          </div>
                          <div className="col-md-12" style={{ paddingTop: '0.7%', color: '#707070' }}>
                            <div>
                              <strong>Responsibility: </strong>
                              <p>{position.responsibility}</p>
                            </div>
                            <div>
                              <strong>Reason for Leaving: </strong>
                              <p>{position.remark}</p>
                            </div>
                            {position.salaryRange && candidate.salaryVisibleStatus.status && (
                              <div>
                                <strong>Salary: </strong>
                                <span>{position.salaryRange.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Experience;
