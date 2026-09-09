# Virtuosa Blumenau Vila Nova — Landing Page

Landing page de conversão (HTML/CSS/JS puros, sem build) com objetivo único:
levar a visitante ao WhatsApp para agendar a **avaliação gratuita**.

## Arquivos

| Arquivo | O que é |
|---|---|
| [index.html](index.html) | A landing page completa (12 seções) |
| [styles.css](styles.css) | Design system: paleta, tipografia, componentes |
| [script.js](script.js) | Links de WhatsApp, carrossel, FAQ, animações |
| [politica-de-privacidade.html](politica-de-privacidade.html) | Página legal linkada no rodapé |
| [assets/img/](assets/img/) | Onde entram as fotos reais |

## Identidade aplicada

- **Magenta `#EC008C`** em CTAs, destaques e ícones — nunca como fundo de página inteira.
- Fundos alternando **branco**, **rosa claro `#FDF2F8`**, **nude `#F7E9E6`** e **bordô `#6E0A38`** (barra de oferta, seção do laser e rodapé).
- Títulos em **Playfair Display**, corpo em **Montserrat**, acentos em **Parisienne** (eco do wordmark script).
- A **silhueta feminina em linha contínua** aparece no logo, nos placeholders de foto e como grafismo de fundo (`.line-deco`).
- Separadores de seção com **traço orgânico** em SVG (`.wave`).

## Como rodar

```bash
python -m http.server 5173
# abra http://localhost:5173
```

## O que trocar antes de publicar

### 1. Fotos — todas integradas
Cada foto é servida em WebP com fallback JPG, via `<picture>`. Os arquivos-mestre
enviados ficam em `assets/originais/` e **não** são servidos pela página.

| Slot | Arquivo | Recorte | Origem |
|---|---|---|---|
| Hero **desktop** | `hero-desktop` | 1920×1150 | fundo-hero-desktop.jpg |
| Hero **mobile** | `hero-mobile` | 1000×1250 | fundo-hero-2.jpg |
| Card emagrecimento | `emagrecimento` | 800×600 | Emagrecimento.jpg |
| Card corporais | `corporal` | 800×600 | Procedimentos Corporais.jpg |
| Card faciais | `facial` | 800×600 | Procedimentos Faciais.jpg |
| Card laser | `laser` | 800×600 | Depilação a Laser.jpg |
| Seção laser | `laser-destaque` | 900×900 | Depilação a Laser.jpg |
| Seção MMI | `metodo-mmi` | 800×1000 | Emagrecimento.jpg |
| Ambiente | `ambiente-recepcao` | 900×675 | imagens/recepção.jpg |
| Ambiente | `ambiente-sala` | 700×875 | imagens/por dentro.jpg |
| Ambiente | `ambiente-consultorio` | 700×875 | imagens/3.jpg |
| Ambiente | `ambiente-entrada` | 700×875 | imagens/2.jpg |
| Localização | `fachada` | 1000×750 | imagens/fachada.jpg |
| Prova social | `google-card` | 620×715 | feedbacks/imgi_67 |
| Prova social | `review-*` (6) | largura 560 | feedbacks/ |

> O hero usa *art direction*: o `<picture>` troca a arte inteira em 940px.
> A versão desktop já vem com o degradê embutido no arquivo e ocupa a hero toda;
> a mobile é a foto solta, exibida como faixa inferior com fade aplicado via CSS.
>
> As duas últimas da tabela são **recortes alternativos** das mesmas fotos dos cards, para não
> deixar as seções com placeholder. Quando houver fotos próprias da unidade para
> o método MMI e para o destaque do laser, é só regerar com os comandos abaixo.

Para regerar qualquer uma (o `px` controla o enquadramento horizontal, 0 = esquerda, 1 = direita):

```python
from PIL import Image
def gerar(origem, destino, W, H, px=0.5, py=0.5):
    im = Image.open(origem).convert('RGB'); iw, ih = im.size
    sc = max(W/iw, H/ih); nw, nh = round(iw*sc), round(ih*sc)
    im = im.resize((nw, nh), Image.LANCZOS)
    l, t = round((nw-W)*px), round((nh-H)*py)
    im = im.crop((l, t, l+W, t+H))
    im.save(f'assets/img/{destino}.jpg','JPEG',quality=82,optimize=True,progressive=True)
    im.save(f'assets/img/{destino}.webp','WEBP',quality=78,method=6)

gerar('assets/originais/Procedimentos Faciais.jpg', 'facial', 800, 600, px=0.72)
```

### 2. Logo oficial — já integrado
O SVG oficial está em `assets/logo.svg` (magenta `#ec008c`, 9 paths, 242×94).
Variantes geradas a partir dele:

- `assets/logo.svg` — header e página de privacidade
- `assets/logo-branco.svg` — rodapé (fundo bordô)
- `assets/simbolo.svg` — só o símbolo (paths 1–7), para favicon / redes

O símbolo real também alimenta o `<g id="mark-silhueta">` no topo do `index.html`,
que é reaproveitado como grafismo de fundo e como placeholder das fotos —
herda a cor via `color:` do elemento pai.

### 3. Imagens originais
`assets/originais/` guarda os 6 arquivos-mestre enviados (~55 MB somados).
Mantenha-os fora do deploy — a pasta `assets/img/` inteira pesa **861 KB**.

### 4. WhatsApp
Número e mensagem padrão ficam no topo do [script.js](script.js#L12-L13):

```js
var WHATSAPP_PHONE = '5547992350986';
var DEFAULT_MSG = 'Olá, estava no site e quero agendar minha avaliação gratuita';
```

> **Atenção:** o link precisa do código do país (`55`). Sem ele, `phone=47992350986`
> não abre a conversa. Por isso o número foi gravado como `5547992350986`.

Cada card de serviço tem sua própria mensagem pré-preenchida via `data-msg`.

### 5. Conteúdo a validar com a clínica
**Depoimentos e prints de WhatsApp inventados foram removidos.** A prova social agora usa
somente as avaliações públicas reais do Google (`assets/img/review-*`) mais a ficha da
unidade (`google-card`), que confirma **4,6 de nota em 107 avaliações**.

Ainda são texto de exemplo, a validar:
- horário de atendimento (hoje: "com hora marcada, consulte pelo WhatsApp")
- formas de pagamento citadas no FAQ
- a foto de procedimentos faciais, única que ainda é de banco de imagens

## De onde vieram as copys

O Instagram [@virtuosablumenauvilanovaa](https://www.instagram.com/virtuosablumenauvilanovaa/)
bloqueia leitura automatizada (login wall). As copys foram construídas a partir das
**páginas oficiais da própria unidade** e da rede:

- [esteticavirtuosa.com.br/blumenau-vila-nova-1](https://esteticavirtuosa.com.br/blumenau-vila-nova-1) — slogan, selos, "107 avaliações", oferta do presente surpresa
- [.../emagrecimento](https://esteticavirtuosa.com.br/blumenau-vila-nova-1/emagrecimento) — MMI, Monji Fast, criolipólise, enzimas, lipo sem corte, nutricionista
- [.../procedimentos-faciais](https://esteticavirtuosa.com.br/blumenau-vila-nova-1/procedimentos-faciais) — limpeza de pele, peeling, microagulhamento, skinbooster, bioestimulador
- [.../procedimentos-corporais](https://esteticavirtuosa.com.br/blumenau-vila-nova-1/procedimentos-corporais) — massagem modeladora, drenagem, criofrequência, celulite, carboxiterapia
- [.../depilacao-a-laser](https://esteticavirtuosa.com.br/blumenau-vila-nova-1/depilacao-a-laser) — os 4 benefícios e as objeções do FAQ

**Foco principal identificado:** emagrecimento com protocolo próprio (MMI — Método
Mary Iaczinski) é o carro-chefe da marca; depilação a laser é a porta de entrada
mais promovida. A página reflete essa hierarquia.

**Claims deliberadamente não usados:** "até 20 kg em 40 dias", "12 cm em 24 horas" e
"42% da gordura" aparecem em materiais da rede, mas são promessas numéricas de resultado
com risco jurídico (CDC/Conar) e de frustração. A página usa linguagem de resultado sem
promessa numérica, com nota de que resultados variam.

## Imagem de compartilhamento (WhatsApp / redes)

`assets/img/og-image.jpg` (home) e `assets/img/og-corporais.jpg` (interna),
ambas 1200×630 e abaixo de 100 KB, dentro do que o WhatsApp aceita para
mostrar o preview grande.

> **Antes de publicar:** troque `SEU-DOMINIO.com.br` pelo domínio real nas
> meta tags `og:` e `canonical` das duas páginas. O WhatsApp **exige URL
> absoluta** em `og:image`; com caminho relativo o preview não aparece.

Depois de publicar, force a releitura do cache:
- WhatsApp: cola o link no [validador do Facebook](https://developers.facebook.com/tools/debug/) e clica em "Scrape Again" (o WhatsApp usa o mesmo cache)
- O cache do link antigo pode levar até 7 dias para expirar sozinho

Para regerar as imagens, os HTMLs de origem podem ser recriados a partir do
histórico do git (`_og.html` / `_og2.html`), renderizados com Chrome headless
em 1200×630 e salvos como JPG qualidade 88.

## Deploy

Site estático, sem dependências. Basta subir a pasta:

```bash
npm i -g vercel   # se ainda não tiver
vercel            # preview
vercel --prod     # produção
```

## Conversão implementada

- Botão flutuante de WhatsApp fixo em todas as telas.
- CTA principal repetido 6x com o mesmo texto e a mesma cor.
- Todos os CTAs abrem o WhatsApp com mensagem pré-preenchida.
- Um único elemento de destaque por seção, texto curto, verbos de ação.
- Mobile-first (390px) até desktop (1440px), com `prefers-reduced-motion` respeitado.
