export default function CustomThemeExample() {
    return (
      <div className="p-6">
        <h1 className="text-4xl font-bold text-brand mb-6">Ejemplo de Tema Personalizado</h1>
  
        {/* Colores personalizados */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Colores Personalizados</h2>
          <div className="flex gap-4 flex-wrap">
            <div className="w-32 h-32 bg-brand flex items-center justify-center text-white font-bold">brand</div>
            <div className="w-32 h-32 bg-brand-light flex items-center justify-center text-white font-bold">
              brand-light
            </div>
            <div className="w-32 h-32 bg-brand-dark flex items-center justify-center text-white font-bold">
              brand-dark
            </div>
            <div className="w-32 h-32 bg-accent flex items-center justify-center text-white font-bold">accent</div>
            <div className="w-32 h-32 bg-accent-light flex items-center justify-center text-white font-bold">
              accent-light
            </div>
            <div className="w-32 h-32 bg-accent-dark flex items-center justify-center text-white font-bold">
              accent-dark
            </div>
            <div className="w-32 h-32 bg-neutral-custom flex items-center justify-center text-gray-800 font-bold border">
              neutral-custom
            </div>
          </div>
        </div>
  
        {/* Espaciados personalizados */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Espaciados Personalizados</h2>
          <div className="flex flex-col gap-4">
            <div className="h-18 bg-brand-light flex items-center justify-center text-white">Altura: h-18 (4.5rem)</div>
            <div className="h-22 bg-accent-light flex items-center justify-center text-white">Altura: h-22 (5.5rem)</div>
            <div className="w-full h-16 bg-neutral-custom flex items-start">
              <div className="w-128 h-full bg-brand flex items-center justify-center text-white">
                Ancho: w-128 (32rem)
              </div>
            </div>
            <div className="w-full h-16 bg-neutral-custom flex items-start">
              <div className="w-144 h-full bg-accent flex items-center justify-center text-white">
                Ancho: w-144 (36rem)
              </div>
            </div>
          </div>
        </div>
  
        {/* Componentes con clases personalizadas */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Componentes con Clases Personalizadas</h2>
          <div className="flex flex-wrap gap-6">
            <button className="btn-brand">Botón Brand</button>
            <button className="btn-accent">Botón Accent</button>
  
            <div className="card-custom w-64">
              <h3 className="font-bold mb-2">Tarjeta Personalizada</h3>
              <p className="text-gray-600">Esta tarjeta usa la clase card-custom con sombra y bordes personalizados.</p>
            </div>
  
            <div className="section-spacing w-full bg-neutral-custom flex items-center justify-center">
              <p>Sección con espaciado personalizado (my-18)</p>
            </div>
  
            <h3 className="mega-title w-full">Título Mega</h3>
          </div>
        </div>
  
        {/* Bordes redondeados personalizados */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Bordes Redondeados Personalizados</h2>
          <div className="flex gap-4">
            <div className="w-32 h-32 bg-brand rounded-xl flex items-center justify-center text-white">rounded-xl</div>
            <div className="w-32 h-32 bg-accent rounded-2xl flex items-center justify-center text-white">rounded-2xl</div>
          </div>
        </div>
  
        {/* Tamaños de fuente personalizados */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tamaños de Fuente Personalizados</h2>
          <p className="text-xxs mb-2">Texto muy pequeño (text-xxs)</p>
          <p className="text-mega text-brand-light">Texto mega (text-mega)</p>
        </div>
      </div>
    )
  }
  
  