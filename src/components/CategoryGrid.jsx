import React from 'react'
import { Gamepad2, Clapperboard, Music, Code, Brush, ShieldCheck } from 'lucide-react'

const categories = [
  { name: 'Games', icon: Gamepad2, color: 'from-blue-500 to-indigo-600' },
  { name: 'Software', icon: Code, color: 'from-green-500 to-teal-600' },
  { name: 'Movies', icon: Clapperboard, color: 'from-yellow-500 to-orange-600' },
  { name: 'Music', icon: Music, color: 'from-pink-500 to-rose-600' },
  { name: 'Art', icon: Brush, color: 'from-purple-500 to-violet-600' },
  { name: 'Antivirus', icon: ShieldCheck, color: 'from-red-500 to-red-700' },
]

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.name} className={`group relative p-6 rounded-xl text-white bg-gradient-to-br ${category.color} flex flex-col items-center justify-center aspect-square overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}>
                <Icon className="h-12 w-12 mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-semibold text-lg text-center">{category.name}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
