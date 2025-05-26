import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import contact from '../../assets/images/contactus.png';

const ContactUs = ({ darkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const licenseOptions = ['Personal', 'Business', 'Enterprise'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email.';
        if (!formData.company.trim()) newErrors.company = 'Company name is required.';
        if (!formData.licenseType) newErrors.licenseType = 'Please select a license type.';
        if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setFormData({ name: '', email: '', company: '', licenseType: '', message: '' });
            setErrors({});
        }
    };

    return (
        <section
            className={`py-20 px-10 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}
            id="contact"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 grid-cols-1 ">
                    <div>
                        <div className="group w-full h-full">
                            <div className="relative h-full">
                                <img
                                    src={contact}
                                    alt="Contact Us"
                                    className="w-full h-full object-cover "
                                />
                                <h1 className="absolute top-8 left-8 text-3xl font-bold text-white shadow-md ">
                                    Contact Us
                                </h1>
                                <div className="absolute bottom-0 w-full p-8">
                                    <div
                                        className={`rounded-lg p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center mb-6">
                                            <FaPhoneAlt className="text-yellow-500 text-xl" />
                                            <h5 className="ml-4">
                                                <a href="tel:1234567890" className="hover:underline">
                                                    123-456-7890
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="flex items-center mb-6">
                                            <FaEnvelope className="text-yellow-500 text-xl" />
                                            <h5 className="ml-4">
                                                <a href="mailto:support@softsell.com" className="hover:underline">
                                                    support@taskmaestro.com
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="text-yellow-500 text-xl" />
                                            <h5 className="ml-4">
                                                987 Silicon Valley Road, Innovation City, CA 94043
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 lg:p-14 bg-opacity-90">
                        <h2 className="text-xl font-semibold mb-6">
                            Send Us A Message
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full h-12 px-4 rounded-md ${darkMode
                                        ? 'bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-gray-400'
                                        : 'bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:ring-primary'
                                        } border focus:outline-none`}
                                    placeholder="Name"
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                />
                                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full h-12 px-4 rounded-md ${darkMode
                                        ? 'bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-gray-400'
                                        : 'bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:ring-primary'
                                        } border focus:outline-none`}
                                    placeholder="Email"
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                />
                                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className={`w-full h-12 px-4 rounded-md ${darkMode
                                        ? 'bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-gray-400'
                                        : 'bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:ring-primary'
                                        } border focus:outline-none`}
                                    placeholder="Company"
                                    aria-invalid={errors.company ? 'true' : 'false'}
                                />
                                {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company}</p>}
                            </div>
                            <div className="mb-4">
                                <select
                                    name="licenseType"
                                    value={formData.licenseType}
                                    onChange={handleInputChange}
                                    className={`w-full h-12 px-4 rounded-md ${darkMode
                                        ? 'bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-gray-400'
                                        : 'bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:ring-primary'
                                        } border focus:outline-none`}
                                    aria-invalid={errors.licenseType ? 'true' : 'false'}
                                >
                                    <option value="">Select License Type</option>
                                    {licenseOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {errors.licenseType && <p className="mt-1 text-red-500 text-sm">{errors.licenseType}</p>}
                            </div>
                            <div className="mb-6">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={`w-full h-32 px-4 py-2 rounded-md ${darkMode
                                        ? 'bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-gray-400'
                                        : 'bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:ring-primary'
                                        } border focus:outline-none`}
                                    placeholder="Message"
                                    aria-invalid={errors.message ? 'true' : 'false'}
                                />
                                {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full h-12 text-white font-semibold bg-primary rounded-md hover:bg-primary-dark transition"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;