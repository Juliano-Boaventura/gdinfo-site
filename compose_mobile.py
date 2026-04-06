from PIL import Image, ImageDraw, ImageFont

# Carregar as 3 imagens mobile HQ
home = Image.open('/home/ubuntu/gdinfo-site/img/tela_mobile_home_hq.png')
produtos = Image.open('/home/ubuntu/gdinfo-site/img/tela_mobile_produtos_hq.png')
contato = Image.open('/home/ubuntu/gdinfo-site/img/tela_mobile_contato_hq.png')

# Definir tamanho padrão (todas devem ter o mesmo tamanho)
target_w = home.width
target_h = home.height

# Redimensionar se necessário
produtos = produtos.resize((target_w, target_h), Image.LANCZOS)
contato = contato.resize((target_w, target_h), Image.LANCZOS)

# Espaçamento e margens
gap = 60
margin_top = 80
margin_bottom = 40
margin_side = 60

# Calcular tamanho total da imagem composta
total_w = margin_side * 2 + target_w * 3 + gap * 2
total_h = margin_top + target_h + margin_bottom

# Criar imagem de fundo branco
canvas = Image.new('RGB', (total_w, total_h), (255, 255, 255))

# Colar as 3 imagens
x1 = margin_side
x2 = margin_side + target_w + gap
x3 = margin_side + (target_w + gap) * 2

canvas.paste(home, (x1, margin_top))
canvas.paste(produtos, (x2, margin_top))
canvas.paste(contato, (x3, margin_top))

# Adicionar labels
draw = ImageDraw.Draw(canvas)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
except:
    font = ImageFont.load_default()

labels = ["Home", "Produtos", "Contato"]
positions = [x1, x2, x3]

for label, x in zip(labels, positions):
    bbox = draw.textbbox((0, 0), label, font=font)
    text_w = bbox[2] - bbox[0]
    draw.text((x + (target_w - text_w) // 2, 20), label, fill=(51, 51, 51), font=font)

# Adicionar bordas finas em cada screenshot
for x in positions:
    draw.rectangle([x-2, margin_top-2, x+target_w+1, margin_top+target_h+1], outline=(200, 200, 200), width=2)

# Salvar
canvas.save('/home/ubuntu/gdinfo-site/img/figura5_mobile_composta.png', quality=95)
print(f"Imagem composta salva: {total_w}x{total_h}px")
