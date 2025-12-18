import { Button } from '@/components/ui/button' 


interface Props {
  title: string
  subTitle?: string
}
export const CustomJombotron = ({title, subTitle}: Props) => { 
  const temporalSubtitle = "Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. Calidad premium para un estilo atemporal."
  return (
     <section className="py-16 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-light tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {subTitle || temporalSubtitle}
          </p>
          <Button size="lg" className="rounded-full px-8 cursor-pointer">
            Explorar Colección
          </Button>
        </div>
      </section>
  )
}
