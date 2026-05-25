# Regras do Projeto: Dudalê

## Identidade Visual e Cores
- Fundo Predominante: Branco puro (#FFFFFF) para máxima limpeza.
- Cores de Sotaque (Accent): Azul Bebê suave (#ADD8E6) e Azul Celeste Claro (#B0E0E6) para detalhes, botões (CTAs) e ícones, transmitindo leveza.
- Tipografia: Serifada elegante e moderna para títulos; Sans-serif limpa para corpo de texto.

## Animação Cinematográfica
- Todo scroll usa Lenis para suavidade. Nunca scroll nativo.
- Todo movimento usa GSAP. NUNCA CSS transition em animações de entrada.
- Ease padrão: power3.out (desaceleração suave e orgânica).
- Duration mínima de entrada: 0.8s. Sites cinematográficos são lentos com intenção.

## Componentes
- Um componente = um .tsx + um .module.css. Sem exceções.
- Sem Tailwind inline. Todo CSS em .module.css.
- Todo componente com GSAP: useGSAP do @gsap/react, cleanup no return.

## O que nunca fazer
- Animações elásticas (bounce) ou "ease-in-out".
- translateY menor que 24px em entradas.
- Duration redonda como 500ms (parece relógio).
