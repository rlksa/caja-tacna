package banco.tacna.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5174")
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String usuario = body.get("usuario");
        String clave = body.get("clave");

        if (usuario != null && !usuario.isBlank() && clave != null && !clave.isBlank()) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("token", "token-" + UUID.randomUUID());
            resp.put("usuario", usuario);
            resp.put("mensaje", "Login exitoso");
            return ResponseEntity.ok(resp);
        }
        return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
    }

    @GetMapping("/cuentas")
    public ResponseEntity<?> cuentas() {
        List<Map<String, Object>> lista = List.of(
            Map.of("tipo", "Ahorro Corriente", "numero", "****-4521", "saldo", 3850.00),
            Map.of("tipo", "Cuenta CTS", "numero", "****-7834", "saldo", 12400.00),
            Map.of("tipo", "DPF Tacna", "numero", "****-2291", "saldo", 20000.00)
        );
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/movimientos")
    public ResponseEntity<?> movimientos() {
        List<Map<String, Object>> lista = List.of(
            Map.of("fecha", "10/05/2025", "descripcion", "Depósito en ventanilla", "tipo", "ingreso", "monto", 500.00),
            Map.of("fecha", "08/05/2025", "descripcion", "Pago servicio SEAL", "tipo", "egreso", "monto", -85.50),
            Map.of("fecha", "05/05/2025", "descripcion", "Transferencia recibida", "tipo", "ingreso", "monto", 1200.00),
            Map.of("fecha", "01/05/2025", "descripcion", "Retiro cajero automático", "tipo", "egreso", "monto", -200.00),
            Map.of("fecha", "28/04/2025", "descripcion", "Pago pensión educativa", "tipo", "egreso", "monto", -350.00)
        );
        return ResponseEntity.ok(lista);
    }
}