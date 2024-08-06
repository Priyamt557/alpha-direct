import React from 'react'

const PhaseOneForm = ({ phaseOneFormData, error, setPhase, setPhaseOneFormData }) => {
    return (
        <form >
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    Insurance Product<sup className='text-red-500'>*</sup>
                </label>
                <select
                    value={phaseOneFormData?.insuranceProduct}
                    onChange={(e) => {
                        setPhaseOneFormData({ ...phaseOneFormData, insuranceProduct: e.target.value })
                    }}
                    type="select"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Enter your email"
                >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
            </div>

            <div className="mb-12">
                <label
                    htmlFor="email"
                    className="block  text-alpha-primary font-bold mb-1"
                >
                    Type of Identification<sup className='text-red-500'>*</sup>
                </label>
                <select
                    value={phaseOneFormData?.typeOfIdentification}
                    onChange={(e) => {
                        setPhaseOneFormData({ ...phaseOneFormData, typeOfIdentification: e.target.value })
                    }}
                    type="select"

                    className="w-full border-2 border-[#CFCFCF] rounded-lg py-2 px-3 text-gray-700"
                    placeholder="Enter your email"
                >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
            </div>
            <p className='text-center mb-6 text-[red]'>{error}</p>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    setPhase(2)

                }}
                type="btn"
                className="bg-alpha-primary w-full font-bold py-2 px-4 rounded-lg text-gray-color1"
            >
                Continue
            </button>
        </form>
    )
}

export default PhaseOneForm