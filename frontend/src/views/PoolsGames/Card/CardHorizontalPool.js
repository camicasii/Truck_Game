import React from 'react'
import poolsData from './poolsGamesData'


const CardHorizontalPool = (  ) => (
  <>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 px-4  mt-8 mb-24">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        APR
                      </th>                      
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Your Stake
                      </th>
  <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stake Value
                      </th>
  <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >

                      </th>
                 
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {poolsData.map((person) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {person.name}
                        </td>
                        <td className="flex px-1 py-8 mr-8 whitespace-nowrap text-sm text-gray-500">
                          {new Intl.NumberFormat().format(person.APR)}%{" "}
                                                 </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.yourStake}
                        </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.stakeValue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <img
                            src={person.image}
                            alt="imagelolli"
                            className="w-16"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
)
export default CardHorizontalPool
