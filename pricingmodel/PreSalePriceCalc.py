


class PreSalePricing:

    def __init__(self, supplied):
        self.assumedQuantity = supplied
        self.requestedQuantity = 0
        
    
    def setQuant(self, quantReq):
        self.requestedQuantity += quantReq
    
    def pxCalc(self):
        demandOrigin = 1500
        demandFactor = 6
        demandPrice = demandOrigin - demandFactor * self.assumedQuantity
        
        supplyOrigin = 268.4210526
        supplyFactor = 0.157894737
        
        if(self.requestedQuantity <= self.assumedQuantity):
            supplyPrice = supplyOrigin + self.assumedQuantity*supplyFactor
        else:
            supplyPrice = supplyOrigin + self.requestedQuantity*supplyFactor
            
        pxSpread = supplyPrice - demandPrice
        qtSpread = self.assumedQuantity - self.requestedQuantity
        
        print('Threshold Price: \t${0}'.format(demandPrice))
        print('Demand Driven Price: \t${0}'.format(supplyPrice))
        print('Supply-Demand Pr Spread: \t${0}'.format(pxSpread))
        print('Supply-Demand Qt Spread: \t{0} - {1}'.format(abs(qtSpread), 'overpriced' if qtSpread > 0 else 'underpriced'))
    



preCalc = PreSalePricing(200)
currQuant = 0

demandedQuantity = 100
currQuant += demandedQuantity
print('Demand Float | Step 1 \t{0} pairs'.format(demandedQuantity))
preCalc.setQuant(demandedQuantity)
preCalc.pxCalc()

print("\n----------\n")

deltaQuantity = 150
currQuant += deltaQuantity
print('Demand Float | Step 2 \t{0} pairs'.format(currQuant))
preCalc.setQuant(deltaQuantity)
preCalc.pxCalc()

print("\n----------\n")

deltaQuantity = 150
currQuant += deltaQuantity
print('Demand Float | Step 3 \t{0} pairs'.format(currQuant))
preCalc.setQuant(deltaQuantity)
preCalc.pxCalc()

print("\n----------\n")

deltaQuantity = 250
currQuant += deltaQuantity
print('Demand Float | Step 4 \t{0} pairs'.format(currQuant))
preCalc.setQuant(deltaQuantity)
preCalc.pxCalc()

print("\n----------\n")

deltaQuantity = 350
currQuant += deltaQuantity
print('Demand Float | Step 5 \t{0} pairs'.format(currQuant))
preCalc.setQuant(deltaQuantity)
preCalc.pxCalc()


