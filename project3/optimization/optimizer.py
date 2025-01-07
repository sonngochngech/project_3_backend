from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scipy.optimize import minimize
from typing import List

app = FastAPI()

class OptimizationInput(BaseModel):
    data: List[List[float]]  # Each row contains [a, b, c, d]

def optimize(data):
    def objective(weights):
        x1, x2, x3 = weights
        return sum((x1 * row[0] + x2 * row[1] + x3 * row[2] - row[3])**2 for row in data)
    
    # Constraint: x1 + x2 + x3 = 1
    cons = {'type': 'eq', 'fun': lambda w: sum(w) - 1}
    
    # Bounds: 0 <= x1, x2, x3 <= 1
    bounds = [(0, 1), (0, 1), (0, 1)]
    
    # Initial guess
    initial_guess = [1/3, 1/3, 1/3]
    
    result = minimize(objective, initial_guess, bounds=bounds, constraints=cons)
    if result.success:
        return result.x.tolist()
    else:
        raise ValueError("Optimization failed")

@app.post("/optimize")
async def get_optimized_weights(input_data: OptimizationInput):
    try:
        optimized_weights = optimize(input_data.data)
        rounded_weights = [round(weight, 2) for weight in optimized_weights]
        return {"optimized_weights": rounded_weights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))