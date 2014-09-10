page = doc.currentPage()
artboard = page.currentArtboard()
canvas = artboard || page

function makeRect (parent, width, height, x, y) {
  layer = parent.addLayerOfType("rectangle")

  layer.frame().width = width
  layer.frame().height = height
  layer.frame().x = x || 0
  layer.frame().y = y || 0

  layer.style().borders().addNewStylePart()
  layer.style().border().position = 0
  layer.style().border().thickness = 1
  layer.style().border().color = [MSColor colorWithHex:"979797" alpha:1.0]

  layer.style().fills().addNewStylePart()
  layer.style().fill().color = [MSColor colorWithHex:"FFFFFF" alpha:0.0]
  return layer
}

function makePath (parent, path) {
  msPath = BCBezierPath.bezierPathWithNSBezierPath(bzPath)
  layer = MSShapeGroup.shapeWithBezierPath(msPath)
  layer.style().borders().addNewStylePart()
  layer.style().border().position = 0
  layer.style().border().thickness = 1
  layer.style().border().color = [MSColor colorWithHex:"979797" alpha:1.0]

  return parent.addLayer(layer)
}

function goldenRect (parent, width) {
  rect = makeRect(parent, width, width / 1.618)
  rect.name = "Golden Rectangle"
  return rect
}
