import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Card, Button, Modal } from 'react-bootstrap';
import { BsArrowRight, BsCalendar, BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';

const ApplicantPipeline = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('lastMonth');
    const [dateRange, setDateRange] = useState({
        start: '',
        end: '',
        display: 'Last 30 days'
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDateRange, setTempDateRange] = useState({
        start: '',
        end: ''
    });
    const [presetRanges] = useState([
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'last7' },
        { label: 'Last 30 days', value: 'lastMonth' },
        { label: 'Last 90 days', value: 'last90' },
        { label: 'Last 12 months', value: 'lastYear' },
        { label: 'Custom', value: 'custom' }
    ]);

    // Sample data generation
    useEffect(() => {
        const generateData = () => {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const generatedData = [];
            const today = new Date();
            const currentYear = today.getFullYear();

            // Generate data for last 2 years
            for (let year = currentYear - 1; year <= currentYear; year++) {
                for (let month = 0; month < 12; month++) {
                    generatedData.push({
                        year: year.toString(),
                        month: months[month],
                        monthNumber: month + 1,
                        applied: Math.floor(Math.random() * 500) + 100,
                        shortlisted: Math.floor(Math.random() * 400) + 50,
                        screening: Math.floor(Math.random() * 300) + 40,
                        interview: Math.floor(Math.random() * 200) + 30,
                        selected: Math.floor(Math.random() * 100) + 20,
                        employee: Math.floor(Math.random() * 80) + 10,
                        decline: Math.floor(Math.random() * 150) + 30,
                        date: `${year}-${(month + 1).toString().padStart(2, '0')}-01`
                    });
                }
            }

            setData(generatedData);
            // Set default date range to last 30 days
            handlePresetRange('lastMonth');
        };

        generateData();
    }, []);

    // Apply date range filter
    useEffect(() => {
        if (!dateRange.start || !dateRange.end) return;

        const result = data.filter(item => {
            const itemDate = new Date(item.date);
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            return itemDate >= startDate && itemDate <= endDate;
        });

        setFilteredData(result);
    }, [data, dateRange]);

    // Handle preset date ranges
    const handlePresetRange = (range) => {
        const today = new Date();
        let startDate = new Date();
        let displayText = '';

        switch (range) {
            case 'today':
                startDate = new Date(today);
                displayText = 'Today';
                break;
            case 'yesterday':
                startDate = new Date(today);
                startDate.setDate(startDate.getDate() - 1);
                displayText = 'Yesterday';
                break;
            case 'last7':
                startDate.setDate(startDate.getDate() - 7);
                displayText = 'Last 7 days';
                break;
            case 'lastMonth':
                startDate.setDate(startDate.getDate() - 30);
                displayText = 'Last 30 days';
                break;
            case 'last90':
                startDate.setDate(startDate.getDate() - 90);
                displayText = 'Last 90 days';
                break;
            case 'lastYear':
                startDate.setFullYear(startDate.getFullYear() - 1);
                displayText = 'Last 12 months';
                break;
            case 'custom':
                setShowDatePicker(true);
                return;
            default:
                break;
        }

        if (range !== 'custom') {
            setDateRange({
                start: startDate.toISOString().split('T')[0],
                end: today.toISOString().split('T')[0],
                display: displayText
            });
            setFilterType(range);
        }
    };

    // Handle custom date range selection
    const handleCustomDateApply = () => {
        if (tempDateRange.start && tempDateRange.end) {
            const start = new Date(tempDateRange.start);
            const end = new Date(tempDateRange.end);

            setDateRange({
                start: tempDateRange.start,
                end: tempDateRange.end,
                display: `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
            });
            setFilterType('custom');
            setShowDatePicker(false);
        }
    };

    // Prepare data for pipeline chart
    const preparePipelineData = () => {
        const totals = {
            applied: 0,
            shortlisted: 0,
            screening: 0,
            interview: 0,
            selected: 0,
            employee: 0,
            decline: 0
        };

        filteredData.forEach(item => {
            Object.keys(totals).forEach(k => {
                totals[k] += item[k];
            });
        });

        return [
            { name: 'Applied', value: totals.applied },
            { name: 'Shortlisted', value: totals.shortlisted },
            { name: 'Screening', value: totals.screening },
            { name: 'Interview', value: totals.interview },
            { name: 'Selected', value: totals.selected },
            { name: 'Employee', value: totals.employee },
            { name: 'Decline', value: totals.decline }
        ];
    };

    const COLORS = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#673AB7', '#FF9800', '#9E9E9E'];

    return (
        <div className="p-2">
            <Row className="align-items-center justify-content-between mb-4">
                <Col>

                    <div className="text-muted small">
                        Showing data for: {dateRange.display}
                    </div>
                </Col>
                <Col className="text-end">
                    <Button
                        variant="outline-primary"
                        onClick={() => setShowDatePicker(true)}
                        className="d-flex align-items-center"
                    >
                        <BsCalendar className="me-2" />
                        {dateRange.display}
                        <BsChevronDown className="ms-2" />
                    </Button>
                </Col>
            </Row>

            {/* Date Picker Modal */}
            <Modal show={showDatePicker} onHide={() => setShowDatePicker(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Select Date Range</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <div className="border-end pe-3">
                                <h6 className="mb-3">Preset Ranges</h6>
                                <div className="d-grid gap-2">
                                    {presetRanges.map(range => (
                                        <Button
                                            key={range.value}
                                            variant={filterType === range.value ? 'primary' : 'outline-secondary'}
                                            onClick={() => handlePresetRange(range.value)}
                                            className="text-start"
                                        >
                                            {range.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col md={8}>
                            <h6 className="mb-3">Custom Range</h6>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={tempDateRange.start}
                                            onChange={(e) => setTempDateRange({ ...tempDateRange, start: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={tempDateRange.end}
                                            onChange={(e) => setTempDateRange({ ...tempDateRange, end: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-muted small mb-3">
                                <strong>Quick tips:</strong>
                                <ul>
                                    <li>Select dates in the format MM/DD/YYYY</li>
                                    {/* <li>Maximum date range is 2 years</li> */}
                                    <li>Data is updated daily at midnight</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDatePicker(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCustomDateApply}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Pipeline Chart */}
            <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                    <Row className="align-items-center mb-3">
                        <Col>
                            <h6 className="mb-0">Applicant Pipeline</h6>
                        </Col>
                        <Col className="text-end">
                            <div className="text-muted small">
                                {filteredData.length} records found
                            </div>
                        </Col>
                    </Row>

                    {/* Reduced and responsive height */}
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={preparePipelineData()}
                                layout="horizontal"
                                margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" type="category" />
                                <YAxis type="number" />
                                <Tooltip
                                    formatter={(value) => [value, 'Applications']}
                                    labelFormatter={(label) => `Stage: ${label}`}
                                />
                                <Legend />
                                <Bar dataKey="value" name="Applications">
                                    {preparePipelineData().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card.Body>
            </Card>


        </div>
    );
};

export default ApplicantPipeline;