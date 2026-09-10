import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBusiness } from '@/context/BusinessContext';
import { Check, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { publicQuoteService } from '@/services/api/publicQuoteService';
import { publicServicesService } from '@/services/api/publicServicesService';
import type { MasterDataDto, MeasurementUnitDto, QuoteRequestCreateDto } from '@/types/quote';
import type { ServiceListDto } from '@/types/service';

export function RequestQuotePage() {
  const { branding } = useBusiness();
  const businessName = branding.data?.businessName ?? '';

  // Master Data State
  const [propertyTypes, setPropertyTypes] = useState<MasterDataDto[]>([]);
  const [workAreaTypes, setWorkAreaTypes] = useState<MasterDataDto[]>([]);
  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnitDto[]>([]);
  const [urgencyTypes, setUrgencyTypes] = useState<MasterDataDto[]>([]);
  const [contactMethods, setContactMethods] = useState<MasterDataDto[]>([]);
  const [services, setServices] = useState<ServiceListDto[]>([]);
  
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<QuoteRequestCreateDto>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    whatsAppNumber: '',
    preferredContactMethodId: null,

    propertyTypeId: 0,
    propertySize: null,
    propertySizeUnitId: null,

    workAreaTypeId: null,
    workAreaLength: null,
    workAreaWidth: null,
    workAreaDimensionUnitId: null,

    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',

    projectDescription: '',
    existingSiteDescription: '',

    preferredStartDate: null,
    urgencyTypeId: null,

    serviceIds: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successRequestNumber, setSuccessRequestNumber] = useState<string | null>(null);

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    setLoadingData(true);
    setDataError(null);
    try {
      const [
        propRes, workRes, unitRes, urgRes, contactRes, srvRes
      ] = await Promise.all([
        publicQuoteService.getPropertyTypes(),
        publicQuoteService.getWorkAreaTypes(),
        publicQuoteService.getMeasurementUnits(),
        publicQuoteService.getUrgencyTypes(),
        publicQuoteService.getContactMethods(),
        publicServicesService.getServices()
      ]);

      if (!propRes.isSuccess || !srvRes.isSuccess) {
        throw new Error('Failed to load required data');
      }

      setPropertyTypes(propRes.data || []);
      setWorkAreaTypes(workRes.data || []);
      setMeasurementUnits(unitRes.data || []);
      setUrgencyTypes(urgRes.data || []);
      setContactMethods(contactRes.data || []);
      setServices(srvRes.data || []);
    } catch (err) {
      setDataError('Unable to load form data. Please check your connection and try again.');
    } finally {
      setLoadingData(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;

    if (type === 'number') {
      parsedValue = value === '' ? null : Number(value);
      if (parsedValue !== null && parsedValue <= 0) return; // Prevent negative/zero in controlled state
    } else if (value === '') {
      // For select fields that allow empty (optional)
      parsedValue = name.endsWith('Id') ? null : '';
    } else if (name.endsWith('Id')) {
      parsedValue = Number(value);
    }

    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleServiceToggle = (serviceId: number) => {
    setFormData(prev => {
      const current = prev.serviceIds;
      if (current.includes(serviceId)) {
        return { ...prev, serviceIds: current.filter(id => id !== serviceId) };
      } else {
        return { ...prev, serviceIds: [...current, serviceId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (formData.propertyTypeId === 0) {
      setSubmitError('Please select a Property Type.');
      return;
    }
    if (formData.serviceIds.length === 0) {
      setSubmitError('Please select at least one Service.');
      return;
    }

    setSubmitting(true);
    try {
      // Ensure null instead of empty string for optional dates and numbers
      const payload = {
        ...formData,
        preferredStartDate: formData.preferredStartDate || null,
        propertySize: formData.propertySize || null,
        workAreaLength: formData.workAreaLength || null,
        workAreaWidth: formData.workAreaWidth || null,
      };

      const response = await publicQuoteService.createQuoteRequest(payload);
      
      if (response.isSuccess && response.data) {
        setSuccessRequestNumber(response.data.requestNumber);
      } else {
        setSubmitError(response.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      setSubmitError('Failed to connect to the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successRequestNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-section-earth)' }}>
        <div className="max-w-md w-full mx-4 bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h2>
          <p className="text-gray-600 mb-6">
            Thank you for sharing your landscaping requirements. Our team will review your project and contact you shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Your Request Number</p>
            <p className="text-lg font-bold text-gray-900">{successRequestNumber}</p>
          </div>
          <Link
            to="/"
            className="inline-flex justify-center items-center w-full px-6 py-3 rounded-xl font-semibold text-white transition-all"
            style={{ background: 'var(--color-primary)' }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" style={{ background: 'var(--color-section-earth)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
            Get a Quote
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Request a Consultation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {businessName ? `Tell us about your project and the team at ${businessName} will get back to you with a free estimate.` : 'Tell us about your project and we will get back to you with a free estimate.'}
          </p>
        </div>

        {loadingData ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-gray-400 mb-4" size={40} />
            <p className="text-gray-500">Loading form...</p>
          </div>
        ) : dataError ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl text-center border border-red-100">
            <AlertCircle className="mx-auto mb-2" size={32} />
            <p className="font-medium mb-4">{dataError}</p>
            <button onClick={loadMasterData} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* 1. Your Details */}
            <div className="p-6 sm:p-10 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-sm mr-3">1</span>
                Your Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input type="tel" name="whatsAppNumber" value={formData.whatsAppNumber || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method *</label>
                  <select required name="preferredContactMethodId" value={formData.preferredContactMethodId || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="" disabled>Select a method</option>
                    {contactMethods.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Property Details */}
            <div className="p-6 sm:p-10 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-sm mr-3">2</span>
                Property Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                  <select required name="propertyTypeId" value={formData.propertyTypeId || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="" disabled>Select property type</option>
                    {propertyTypes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approx. Size (Optional)</label>
                  <input type="number" min="1" step="any" name="propertySize" value={formData.propertySize || ''} onChange={handleInputChange} placeholder="e.g. 500" className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size Unit</label>
                  <select name="propertySizeUnitId" value={formData.propertySizeUnitId || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="">Select unit</option>
                    {measurementUnits.filter(u => u.unitType === 'Area').map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Work Area (Optional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area Type</label>
                  <select name="workAreaTypeId" value={formData.workAreaTypeId || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="">Select area</option>
                    {workAreaTypes.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                  <input type="number" min="1" step="any" name="workAreaLength" value={formData.workAreaLength || ''} onChange={handleInputChange} placeholder="e.g. 20" className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                  <input type="number" min="1" step="any" name="workAreaWidth" value={formData.workAreaWidth || ''} onChange={handleInputChange} placeholder="e.g. 10" className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimension Unit</label>
                  <select name="workAreaDimensionUnitId" value={formData.workAreaDimensionUnitId || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="">Select unit</option>
                    {measurementUnits.filter(u => u.unitType === 'Length').map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. What Do You Need? */}
            <div className="p-6 sm:p-10 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-sm mr-3">3</span>
                What Do You Need?
              </h2>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Required Services * <span className="text-gray-400 font-normal ml-2">(Select all that apply)</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {services.map(service => {
                    const isSelected = formData.serviceIds.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceToggle(service.id)}
                        className={`flex items-start p-3 rounded-xl border text-left transition-all ${isSelected ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white'}`}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-green-900' : 'text-gray-700'}`}>{service.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Description *</label>
                <p className="text-xs text-gray-500 mb-2">Tell us what you would like to do with the property...</p>
                <textarea required name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={4} className="w-full rounded-lg border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-y" placeholder="E.g., I want to completely redesign the front lawn and add flowering plants..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Existing Site Description (Optional)</label>
                <p className="text-xs text-gray-500 mb-2">Tell us about the current condition of the area...</p>
                <textarea name="existingSiteDescription" value={formData.existingSiteDescription || ''} onChange={handleInputChange} rows={2} className="w-full rounded-lg border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-y" placeholder="E.g., The existing lawn is damaged and mostly soil..."></textarea>
              </div>
            </div>

            {/* 4. Property Location */}
            <div className="p-6 sm:p-10 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-sm mr-3">4</span>
                Property Location
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <input required type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                  <input type="text" name="addressLine2" value={formData.addressLine2 || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input required type="text" name="state" value={formData.state || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code (Optional)</label>
                  <input type="text" name="postalCode" value={formData.postalCode || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* 5. Project Timing */}
            <div className="p-6 sm:p-10 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-sm mr-3">5</span>
                Project Timing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Start Date (Optional)</label>
                  <input type="date" name="preferredStartDate" value={formData.preferredStartDate || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency (Optional)</label>
                  <select name="urgencyTypeId" value={formData.urgencyTypeId || ''} onChange={handleInputChange} className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="">Select urgency</option>
                    {urgencyTypes.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="p-6 sm:p-10 bg-gray-50/50 flex flex-col items-center">
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg w-full flex items-start text-sm border border-red-100">
                  <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: 'var(--color-primary)' }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
              <p className="mt-4 text-xs text-gray-500 text-center">
                By submitting this request, you agree to be contacted regarding this quote. Your information is kept secure.
              </p>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
